import { JwtTestDB } from '../databases/MySqlConnection.js';

// const ArtistController = {
//     //* GET DATA
//     index: async (req, res) => {
//         try {
//             const [data] = await JwtTestDB.query(`
//                 SELECT chats.*, message, attachment FROM chats
//                 LEFT JOIN messages ON chats.username = messages.username
//                 ORDER BY messages.created_at ASC
//             `);

//             res.status(200).json({
//                 data: data,
//                 message: 'Success'
//             });
//         } catch (err) {
//             console.error('Error fetching messages:', err);
//             res.status(500).json({ message: 'Error fetching messages: ' + err });
//         }
//     },
//     //* INSERT DATA
//     store: async (req, res) => {
//         const id = req.params.id;
//         try {
//             const [data] = await JwtTestDB.query(`
//                 SELECT chats.*, message, attachment FROM chats
//                 LEFT JOIN messages ON chats.username = messages.username
//                 WHERE chats.id = '${id}'
//                 ORDER BY messages.created_at ASC
//             `);

//             res.status(200).json(data);
//         } catch (err) {
//             console.error('Error fetching messages:', err);
//             res.status(500).json({ message: 'Error fetching messages: ' + err });
//         }
//     },
// };

class ArtistController {
    //* GET DATA
    static async index(req, res) {
        try {
            const [data] = await JwtTestDB.query(`
                SELECT * FROM users
            `);

            res.status(200).json({ status: 'success', data: data });
        } catch (err) {
            console.error('Error fetching messages:', err);
            res.status(500).json({ status: 'error', message: 'Error fetching data: ' + err });
        }
    }

    //* INSERT / ADD DATA
    static async store(req, res) {
        const {} = req.body;
        try {
            const [data] = await JwtTestDB.query(`
                SELECT chats.*, message, attachment FROM chats
                LEFT JOIN messages ON chats.username = messages.username
                ORDER BY messages.created_at ASC
            `);

            res.status(200).json(data);
        } catch (err) {
            console.error('Error fetching messages:', err);
            res.status(500).json({ message: 'Error fetching data: ' + err });
        }
    }

    //* SHOW DATA
    static async show(req, res) {
        const id = req.params.id;
        try {
            const [data] = await JwtTestDB.query(`
                SELECT chats.*, message, attachment FROM chats
                LEFT JOIN messages ON chats.username = messages.username
                WHERE chats.id = '${id}'
                ORDER BY messages.created_at ASC
            `);

            res.status(200).json(data);
        } catch (err) {
            console.error('Error fetching messages:', err);
            res.status(500).json({ message: 'Error fetching data: ' + err });
        }
    }

    //* UPDATE DATA
    static async update(req, res) {
        const id = req.params.id;
        const data = req.body;
        try {
            const [data] = await JwtTestDB.query(`
                SELECT chats.*, message, attachment FROM chats
                LEFT JOIN messages ON chats.username = messages.username
                WHERE chats.id = '${id}'
                ORDER BY messages.created_at ASC
            `);

            res.status(200).json(data);
        } catch (err) {
            console.error('Error fetching messages:', err);
            res.status(500).json({ message: 'Error fetching data: ' + err });
        }
    }

    //* DELETE DATA
    static async destroy(req, res) {
        const id = req.params.id;
        try {
            const [data] = await JwtTestDB.query(`
                SELECT chats.*, message, attachment FROM chats
                LEFT JOIN messages ON chats.username = messages.username
                WHERE chats.id = '${id}'
                ORDER BY messages.created_at ASC
            `);

            res.status(200).json(data);
        } catch (err) {
            console.error('Error fetching messages:', err);
            res.status(500).json({ message: 'Error fetching data: ' + err });
        }
    }
}


export default ArtistController;
