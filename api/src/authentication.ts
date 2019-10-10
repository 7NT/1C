import { ServiceAddons, Params } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth, OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth';
import axios from 'axios';
import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityData (profile: OAuthProfile, existing: any, params: Params) {
    const baseData = await super.getEntityData(profile, existing, params);
    console.log(baseData, profile);
    return {
      ...baseData,
      email: profile
    };
  }
}

class FacebookStrategy extends OAuthStrategy {
  async getProfile (_data: AuthenticationRequest, _params: Params) {
    // This is the oAuth access token that can be used
    // for Facebook API requests as the Bearer token
    const accessToken = authResult.access_token;

    const { data } = await axios.get('https://graph.facebook.com/me', {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      params: {
        // There are 
        fields: 'id,name,email'
      }
    });

    return data;
  }

  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    // `profile` is the data returned by getProfile
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      email: profile.email
    };
  }
}


export default function (app: Application) {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('google', new GoogleStrategy());
  authentication.register('facebook', new FacebookStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
