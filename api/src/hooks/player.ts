// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { isPlayer, getMIX } from '../jb';


const seatCheck = (): Hook => {
  return async (context: HookContext) => {
    const id = context.id
    const { tId: tId1, sId: sId1 } = context.data;

    const { connection } = context.params;
    if (connection) {
      const tableService = context.app.service('tables');
      const user = connection.user;
      const { _id: uId, tId: tId0, sId: sId0 } = user;

      if (tId0 && tId0 != tId1) {  //leave table
        let _table0 = await tableService.get(tId0);
        // free seat
        if (_table0.players < 2) {
          tableService.remove(tId0);
        } else {
          let tdata = {
            players: _table0.players - 1,
            seats: _table0.seats
          };
          if (isPlayer(sId0)) {
            if (tdata.seats[sId0 - 1] === uId) tdata.seats[sId0 - 1] = null;
          }
          tableService.patch(tId0, tdata);
        }
        context.app.channel(`#${_table0.id}`).leave(connection);
      }
      if (!tId1) {  //new table
        const newTable = {
          id: uId,
          name: user.nick,
          state: 0,
          bt: getMIX(),
          players: 1,
          seats: [null, null, null, null]
        };
        newTable.seats[sId1 - 1] = uId;
        let _table1 = await tableService.create(newTable);
        context.data.tId = _table1.id;
        context.app.channel(`#${_table1.id}`).join(connection);
      } else {  //exist table
        let _table1 = await tableService.get(tId1);
        let tdata = {
          players: _table1.players,
          seats: _table1.seats,
          state: _table1.state
        };

        if (tId1 != tId0) {
          // tdata.players++
          context.app.channel(`#${_table1.id}`).join(connection);
        }
        let n = 0;
        _table1.seats.forEach((u: any, i: number) => {
          if (i === sId1 - 1 && u == null) {
            tdata.seats[i] = uId;
          } else if (u == uId) {
            tdata.seats[i] = null;
          }
          if (tdata.seats[i] != null) n++;
        });

        tdata.players = n;
        tableService.patch(_table1.id, tdata);
      }
      console.log('context', context.data)
      return Promise.resolve(context);
    }
  }
};

export {
  seatCheck
}
