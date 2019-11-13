import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { Params } from 'express-serve-static-core';

// A type interface for our user (it does not validate any data)
interface PlayerData {
  _id: string;
  nick?: string;
  avatar?: string;
  county?: string;
  state: number,
  tId?: string;
  sId?: number;
}

export class Players extends Service {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  create (data: PlayerData, params?: Params) {
    // This is the information we want from the player enter lobby
    const { _id, avatar, state, tId, sId } = data;
    console.log(data);
    // The complete player
    const playerData = {
      _id,
      avatar,
      state,
      tId,
      sId
    };

    return super.create(playerData, params);
  }
};
