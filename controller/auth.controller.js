const client = require('../configs/database.js');
const jwt =  require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt.js');
const { logging } = require('../middleware/loggingMiddleware.js');

// login
async function login(req, res) {
    const { pin, citizen_id } = req.body;
    const action_type = 1;

    if (isNaN(citizen_id)) {
        return res.status(400).json({ message: 'PIN and Citizen ID must be numbers' });
    }

    try {
        const query = `
            SELECT id, pin, citizen_id, account_type, account_role, account_status 
            FROM "user"
            WHERE pin = $1`;

        const result = await client.query(query, [pin]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = result.rows[0];

        if (user.account_status === '0') {
            logging(action_type, user.id, 'Failed', 'Account disabled');
            return res.status(401).json({ message: 'Account disabled' });
        }

        const isCitizenIdValid = citizen_id === user.citizen_id;

        if (!isCitizenIdValid) {
            logging(action_type, user.id, 'Failed', 'Authentication failed');
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const tokenPayload = {
            id: user.id,
            account_type: user.account_type,
            account_role: user.account_role,
        };

        const token = jwt.sign(tokenPayload, jwtSecret);
        logging(action_type, user.id, 'Success', 'Authentication successful');
        res.status(200).json({ message: 'Authentication successful', token, account_role: user.account_role, account_type: user.account_type });
    } catch (err) {
        console.error(err.message);
        logging(action_type, '1', 'Error', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { login };
