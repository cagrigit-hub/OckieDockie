import { JwtStrategy } from './jwt.strategy';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { DocumentController } from './document.controller';
import { DocumentSchema } from './document.schema';
import { DocumentService } from './document.service';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, JwtStrategy],
  exports: [DocumentService],
})
export class DocumentModule {}
