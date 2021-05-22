const jwt = require('jsonwebtoken');
const connection = require('../config/dbConexion')

let secret = 'claveSecreta'
class advertisementController {

    findAdvertisements = (req, res) => {

      const sql = `SELECT * FROM advertisement WHERE deleted = 0`;
      if (req.query.location && req.query.location != "null") {
        sql += ` AND location = '${req.query.location}'`;
      }
      if (req.query.advertisement_discipline && req.query.advertisement_discipline != "null") {
        sql += ` AND advertisement.advertisement_id IN (select advertisement.advertisement_id from discipline, advertisement_discipline where advertisement_discipline.discipline_id = discipline.discipline_id and discipline.discipline_name = '${req.body.advertisement_discipline}')`;
      }

      connection.query(sql, (error, results) => {
          if (error) {
              console.log(error);
              res.status(400).json({ error });
          } else {
              res.status(200).json(results);
          }
      });
    }


    getAdvertisement = (req, res) => {

      const sql = `SELECT * FROM advertisement WHERE deleted = 0 AND advertisement_id = ${req.params.id}`;

      connection.query(sql, (error, results) => {
          if (error) {
              console.log(error);
              res.status(400).json({ error });
          } else {
              res.status(200).json(results);
          }
      });
    }

    createAdvertisement = (req, res) => {
      const sql = `INSERT INTO advertisement (
        location, 
        link,
        photo,
        name) 
        VALUES (
          '${req.body.location}', 
          '${req.body.link}', 
          '${req.file.path}',
          '${req.body.name}'
        )`;
        console.log(req.body);
        connection.query(sql, (err, result) => {
            if (err) throw err;

            const advertisement_id = result.insertId;
            if(req.body.discipline){
              const discipline = rep.body.discipline;
              this.addDiscipline(advertisement_id, discipline);
            }
        });  
    }

    // Eliminado lógico de un anuncio
    deleteAdvertisement = (req, res) => {
        const id = req.params.id;
        const sql = `UPDATE advertisement SET deleted = 1, delete_at = now() WHERE advertisement_id = ${id}`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
    }
    
    // Advertisement for user
    getAdvertisementForUser = (req, res) => {
      const user_id = req.params.id;
      const sql = `SELECT advertisement.* FROM advertisement, user_advertisement WHERE user_advertisement.user_id = ${user_id} AND advertisement.deleted = 0`;
      connection.query(sql, (error, results) => {
          if (error) {
              console.log(error);
              res.status(400).json({ error });
          } else {
              res.status(200).json(results);
          }
      });
    }
    
    addAdvertisementsForUser = (req, res) => {
      const user_id = req.params.id;
      const { advertisement_id } = req.body.id;
      const sql = `INSERT INTO user_advertisement (user_id, advertisement_id) VALUES(${user_id}, ${advertisement_id})`;
      connection.query(sql, (error, results) => {
          if (error) {
              console.log(error);
              res.status(400).json({ error });
          } else {
              res.status(200).json(results);
          }
      });
    }

    addDiscipline = (advertisement_id, discipline, way) => {
      console.log(discipline)
      let disciplines = discipline;
      if(way === 'update'){
        disciplines = disciplines.splice(-1, 1)
        disciplines = disciplines.toString();
      }
      let disciplineFinal = disciplines.split(',')
      console.log(disciplineFinal)
      for (let i = 0; i < disciplineFinal.length; i++) {
      if(disciplineFinal.length >= 1 && disciplineFinal[i] !== 'undefined' && disciplineFinal[i] !== ''){

          let deleteOldDisciplines = `DELETE FROM advertisement_discipline WHERE advertisement_id = ${advertisement_id}`;
           connection.query(deleteOldDisciplines, (error, result) => {
              if (error) {
                  console.log(error);
              } else {
                  for (let j = 0; j < disciplineFinal.length; j++) {
                      let discipline_name = disciplineFinal[i];
                      if (discipline_name !== 'undefined'){

                              let disciplineId = `SELECT discipline_id FROM discipline WHERE discipline_name = '${discipline_name}'`;
          
                              connection.query(disciplineId, (error, result2) => {
                                  let disciplineIdFinal = result2[0].discipline_id;
          
                                  if (error) {
                                      console.log(error);
                                  } else {
                                      let insertDisciplineId = `INSERT INTO advertisement_discipline (discipline_id, advertisement_id) VALUES (${disciplineIdFinal}, ${advertisement_id})`;
                                      connection.query(insertDisciplineId, (error, result3) => {
          
                                          if (error) {
                                              console.log(error);
                                          } else {
                                              return result3;
                                          }
                                      });
                                  }
                              });
                      }
                      
                  }
              }
          }
      );
      } else {
          console.log('no ha entrado al bucle')
      }}
  }
}


module.exports = new advertisementController();
