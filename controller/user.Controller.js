const connection = require('../config/dbConexion');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;


class userController {

    createUser = (req, res) => {

        const { date_of_birth, last_name, user_name, artistic_name, location, mail, password, discipline } = req.body;
        console.log(req.body)
        bcrypt.hash(password, saltRounds, function(err, hash) {
            const sql = `INSERT INTO user (
            date_of_birth, 
            last_name, 
            user_name, 
            artistic_name,  
            location, 
            password,  
            type,
            mail) 
            VALUES (
                '${date_of_birth}', 
                '${last_name}', 
                '${user_name}', 
                '${artistic_name}', 
                '${location}', 
                '${hash}', 
                1, 
                '${mail}'
            )`;
            connection.query(sql, (err, result) => {
                if (err) throw err;
                this.findUser(mail, hash, function(err, data) {
                    if (err) throw err;
                    const [user] = data;
                    const token = jwt.sign({ user: { type: user.type, user_id: user.user_id, artistic_name: user.artistic_name, email: user.mail, avatar: user.avatar } },
                        process.env.SECRET, { expiresIn: '1min' }
                    );
                     
                    res.status(200).json(token)
                })
                const user_id = result.insertId;
                if(req.body.discipline){
                    this.addDiscipline(user_id,discipline);
                }
            });
        }.bind(this));
    }

    updateUserData = (req, res) => {
        const { date_of_birth, last_name, user_name, artistic_name, location, mail, password, discipline } = req.body;
        const user_id = req.params.user_id;

        bcrypt.hash(password, saltRounds, function(err, hash) {
            const sql = `UPDATE user SET
            date_of_birth = '${date_of_birth}', 
            last_name = '${last_name}',
            user_name = '${user_name}', 
            artistic_name = '${artistic_name}',  
            location = '${location}', 
            password = '${hash}', 
            mail = '${mail}',
            update_at = now() 
            WHERE user_id = ${user_id}`;

            connection.query(sql, (err, result) => {
                if (err) throw err;
                if(req.body.discipline){
                    this.addDiscipline(user_id,discipline);
                }
                res.status(200).json(result);
            });
        });
    }

    findUser = (email, password, cb) => {
        const sql = `SELECT * from user where mail = '${email}' and password = '${password}'`;
        return connection.query(sql, (err, result) => {
            if (err) throw err;
            cb(null, result)
        })
    }

    updateAvatar = (req, res) => {
        const avatar = req.file.filename;
        const sql = `UPDATE user SET avatar = '${avatar}' WHERE user_id = ${req.params.user_id}`
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        });
    }

    

    login = (req, res) => {
        const { email, password } = req.body;
        const sql = `SELECT mail, password, artistic_name, user_id, avatar, type FROM user WHERE mail = '${email}'`;
        connection.query(sql, (error, result) => {
            // en caso de error en la base de datos 
            if (error) {
                return res.status(400).json(error);
            }
            // en caso de no encontrar ningún resultado en la query 
            if (!result || !result.length) {
                return res.status(401).json('Usuario no registrado');
            }
            // se compara el password con bcrypt y devuelve true si son correctas las credenciales
            // además generamos el token solo si las credenciales son correctas
            // y se ha agregado a la query user_name ya que se usa para la generaciòn del token
            const [user] = result; // esto es lo mismo que const user = result[0]
            const hash = user.password
            bcrypt.compare(password, hash, function(err, response) {
                if (response === true) {
                    const token = jwt.sign({ user: { type: user.type, user_id: user.user_id, artistic_name: user.artistic_name, email: user.mail, avatar: user.avatar } },
                        process.env.SECRET, { expiresIn: '1min' }
                    );
                    return res.status(200).json({ token });
                } else {
                    return res.status(401).json('Contraseña inválida');
                }
            })
        })
    }

    //devuelve todos los ususarios
    readUser(req, res) {
        console.log('**************')

        let sql = `SELECT * FROM user WHERE deleted = 0 and type = 1`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            // const userWithDisciplines = result.forEach(item =>{
            //         item.discipline = this.getDisciplinesByUserIdFunction(item.user_id).bind(this)
            //         return item;
            //     })
            //     console.log(userWithDisciplines);

            res.status(200).json(result);
        });
    };


    //devuelve el usuario seleccionado
    readUserById = (req, res) => {
        const sql = `SELECT * FROM user WHERE user_id = ${req.params.user_id} AND deleted = 0`;
        connection.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                res.status(200).json(results[0]);
            }
        });
    };

    //devuelve todos los tags asociados a un usuario
    getTagsByUserId(req, res) {
        let sql = `SELECT tag_name FROM tag WHERE tag_id = (SELECT tag_id FROM user_tag WHERE user_id = ${req.params.user_id})`;
        connection.query(sql, (err, result) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                res.status(200).json(result[0]);
            }
        });
    }


    //devuelve todas las disciplinas de la tabla disciplina
    getDisciplines(req, res) {
        let sql = `SELECT * FROM discipline`;
        connection.query(sql, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                res.status(200).json(result);
            }
        });
    };

    //devuelve todas las disciplinas asociadas a un usuario
    getDisciplinesByUserId(req, res) {
        console.log('entra en este método')
        let sql = `SELECT * FROM discipline WHERE discipline_id IN (SELECT discipline_id FROM user_discipline WHERE user_id = ${req.params.user_id})`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
            console.log(result)
        });
    }
    getDisciplinesByUserIdFunction(user_id) {
        let sql = `SELECT * FROM discipline WHERE discipline_id IN (SELECT discipline_id FROM user_discipline WHERE user_id = ${user_id})`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            return result;
            console.log(result)
        });
    }



    updateUser = (req, res) => {
        console.log('---------------------------1')
        const user_id = req.params.user_id;
        console.log(req.body)
        console.log(user_id)
        const { artistic_name, user_name, tag, biography, discipline } = req.body;
        console.log('---------------------------2')
        console.log(req.files)

        // En req.files tenemos un objeto con cada uno de los archivos:
        // Documentado en: https://www.npmjs.com/package/multer
        // Como un campo en multer puede contener varios ficheros de subida,
        // pero solo experamos uno, seleccionamos con [0] el primero
        const avatar = (req.files && req.files.avatar) ? req.files.avatar[0].filename : '';
        const front = (req.files && req.files.front) ? req.files.front[0].filename : '';
        console.log('---------------------------3')

        console.log(req.body)
            // const {avatar, artistic_cv} = req.file;

        let sql = `UPDATE user SET 
        artistic_name='${artistic_name}',
        user_name='${user_name}',
        biography='${biography}',`;

        // Si viene el avatar, lo añadimos
        if (avatar) {
            sql += `
			        avatar='${avatar}',`;
        }

        // Si viene el front, lo añadimos.
        if (front) {
            sql += `
			        front='${front}',`;
        }

        sql += `update_at = now() 
        	WHERE user_id=${user_id}`;

        console.log(sql, '-----------------5')

        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error });
            } else {
                if (req.body.tag) {
                    this.addTag(user_id, tag);
                }
                if (req.body.discipline) {
                    let update = 'update';
                    this.addDiscipline(user_id, discipline, update);
                }
                res.status(200).json(result);
            }


        });

    }

    addDiscipline = (idUser, discipline, way) => {
        const user_id = idUser;
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

            let deleteOldDisciplines = `DELETE FROM user_discipline WHERE user_id = ${user_id}`;
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
                                        let insertDisciplineId = `INSERT INTO user_discipline (discipline_id, user_id) VALUES (${disciplineIdFinal}, ${user_id})`;
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


    addTag = (id_user, tags) => {
        const user_id = id_user;

        let tag = tags;
        tag = tag.splice(-1, 1)
        tag = tag.toString();
        tag = tag.split(', ');

        for (let i = 0; i <= tag.length; i++) {
            let tag_name = tag[i];
            let addTags = `INSERT INTO tag (tag_name) VALUES ('${tag_name}')`;

            connection.query(addTags, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    let tagId = `SELECT tag_id FROM tag WHERE tag_name = '${tag_name}'`;

                    connection.query(tagId, (error, result2) => {
                        let tagIdFinal = result2[0].tag_id;

                        if (error) {
                            console.log(error);
                        } else {
                            let insertTagId = `INSERT INTO user_tag (tag_id, user_id) VALUES (${tagIdFinal}, ${user_id})`;
                            connection.query(insertTagId, (error, result3) => {

                                if (error) {
                                    console.log(error);
                                } else {
                                    return result3;
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    searchUser = (req,res) => {
        this.findUser2(req,res,req.body)
    }

    findUser2 = (req, res, p) => {
      console.log(p);
      const sql = `SELECT * FROM user WHERE 1 = 1`;
      let where = "";
      if (p.user_name && p.user_name != "null") {
        where = ` AND user_name LIKE '%${p.user_name}%'`;
      }
      if (p.last_name && p.last_name != "null") {
        where += ` AND last_name LIKE '%${p.last_name}%'`
         
      }
      if (p.artistic_name && p.artistic_name != null) {
        where += ` AND artistic_name LIKE '%${p.artistic_name}%'`
          
      }
      if (p.location && p.location != "null") {
        where += ` AND location = '${p.location}'`
 
      }
      if (p.tag && p.tag != "null") {
        where += ` AND user.user_id in (select user.user_id from user, tag, user_tag where user.user_id = user_tag.user_id and user_tag.tag_id = tag.tag_id and tag.tag_name like '%${p.tag}%')`
      }
      if (p.discipline_name && p.discipline_name != "null") {
        where += ` AND user.user_id in (select user.user_id from user, discipline, user_discipline where user.user_id = user_discipline.user_id and user_discipline.discipline_id = discipline.discipline_id and discipline.discipline_name = '${p.discipline_name}')`
      }
    
      const sqlFinal = where ? `${sql} ${where}` : sql;
      console.log(sqlFinal);
      connection.query(sqlFinal, (error, results) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error });
        } else {
          let r = JSON.stringify(results);
          r = JSON.parse(r);
       
          res.status(200).json(r);
        }
     });
    }

    //elimina usuario
    deleteUser(req, res) {
        const id = req.params.user_id;
        let sql = `DELETE FROM user WHERE user_id= ${id}`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    };

    //Borrado lógico de usuario
    UpdateDeleted(req, res) {
        const id = req.params.user_id;
        let sql = `UPDATE user SET deleted = 1, delete_at = now() WHERE user_id= ${id}`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    };

}
module.exports = new userController();