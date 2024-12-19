import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomBytes } from 'crypto';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt)
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    async signup({ email, password, firstName, lastName }: CreateUserDto) {
        const emailExist = await this.repo.find({ where: { email } })
        if (emailExist.length) {
            throw new BadRequestException("Email is already in use")
        }

        const salt = randomBytes(8).toString("hex")
        const hash = await (scrypt(password, salt, 32)) as Buffer
        const hashedPassword = salt + "." + hash.toString("hex")
        const user = this.repo.create({ email, password: hashedPassword, firstName, lastName })
        this.repo.save(user)
        return user

    }

    async signin(email: string, password: string) {
        const [user] = await this.repo.find({ where: { email } })
        if (!user) {
            throw new BadRequestException("Email doesn't exist")
        }
        const [salt, storedHash] = user.password.split(".")
        const hash = await (scrypt(password, salt, 32)) as Buffer

        if (hash.toString("hex") != storedHash) {
            throw new BadRequestException("incorrect password")
        }
        return user
    }

    async findUser(id: string) {
        const user = this.repo.findOneBy({ id: parseInt(id) })
        if (!user) {
            throw new NotFoundException(`Users with the id of ${id} is not found`)
        }
        return user
    }
}
