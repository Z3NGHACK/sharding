steps for running the program
- docker-compose up -d
+ or run local
- mysql -u root -p -h 127.0.0.1 -P 3306
- mysql -u root -p -h 127.0.0.1 -P 3307
- mysql -u root -p -h 127.0.0.1 -P 3308

Run the migration command for each shard:
- npx prisma migrate dev --schema=prisma/shard1.prisma --name init
- npx prisma migrate dev --schema=prisma/shard2.prisma --name init
- npx prisma migrate dev --schema=prisma/shard3.prisma --name init

If migrations fail, use db push instead:
- npx prisma db push --schema=prisma/shard1.prisma
- npx prisma db push --schema=prisma/shard2.prisma
- npx prisma db push --schema=prisma/shard3.prisma

- Run your Node.js server:
node index.js

check on shard
USE shard1;
SELECT * FROM User;
USE shard2;
SELECT * FROM User;
USE shard3;
SELECT * FROM User;
