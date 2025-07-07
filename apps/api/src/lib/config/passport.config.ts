// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as TwitterStrategy } from 'passport-twitter';
// import CONFIG from '../../config';

// // Gantikan dengan DB logic kalian
// const findOrCreateUser = async (profile: any) => {
//   return { id: profile.id, name: profile.displayName, provider: profile.provider };
// };

// const findUserById = async (id: string) => {
//   return { id };
// };

// export const configurePassport = () => {
//   // Google
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: CONFIG.GOOGLE_CLIENT_ID,
//         clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
//         callbackURL: CONFIG.GOOGLE_CALLBACK_URL,
//       },
//       async (_accessToken, _refreshToken, profile, done) => {
//         const user = await findOrCreateUser(profile);
//         done(null, user);
//       }
//     )
//   );

//   // Facebook
//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: CONFIG.FACEBOOK_APP_ID,
//         clientSecret: CONFIG.FACEBOOK_APP_SECRET,
//         callbackURL: CONFIG.FACEBOOK_CALLBACK_URL,
//         profileFields: ['id', 'displayName', 'photos', 'email'],
//       },
//       async (_accessToken, _refreshToken, profile, done) => {
//         const user = await findOrCreateUser(profile);
//         done(null, user);
//       }
//     )
//   );

//   // Twitter
//   passport.use(
//     new TwitterStrategy(
//       {
//         consumerKey: CONFIG.TWITTER_CLIENT_ID,
//         consumerSecret: CONFIG.TWITTER_CLIENT_SECRET,
//         callbackURL: CONFIG.TWITTER_CALLBACK_URL,
//       },
//       async (_token, _tokenSecret, profile, done) => {
//         const user = await findOrCreateUser(profile);
//         done(null, user);
//       }
//     )
//   );

//   passport.serializeUser((user: any, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     const user = await findUserById(id);
//     done(null, user);
//   });
// };
