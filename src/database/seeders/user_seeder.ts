import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import User from "../entities/user";

class UserSeeder implements Seeder {
    public async run(datasource: DataSource) {
        const userRepository = datasource.getRepository(User);

        const userAdmin = userRepository.create({
            email: 'user@test.aaa',
            password: 'user',
            is_active: true,
        });

         userRepository.save(userAdmin);
    }
}

export default UserSeeder;