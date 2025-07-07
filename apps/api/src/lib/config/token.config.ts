// import jwt from 'jsonwebtoken';
// import { UserPayload } from '@/models/user.model';

// export class JwtUtils {
//   private static secret = process.env.JWT_SECRET as any;
//   private static expiration = '7d' as any;

//   static generateToken(payload: UserPayload, expiresIn?: string) {
//     return jwt.sign(payload, this.secret, {
//       expiresIn: expiresIn || this.expiration,
//     });
//   }
//   static verifyToken(token: string) {
//     return jwt.verify(token, this.secret) as UserPayload;
//   }
// }
