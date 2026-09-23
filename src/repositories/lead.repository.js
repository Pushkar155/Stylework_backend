import { pool } from "../config/database.js";

export const createLead = async ({ name, email, phone }) => {
  const query = `
    INSERT INTO leads (
      name,
      email,
      phone
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      name,
      email,
      phone,
      status,
      created_at AS "createdAt";
  `;

  const values = [name, email, phone];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const findLeads = async (search) => {
  let query = `
    SELECT
      id,
      name,
      email,
      phone,
      status,
      created_at AS "createdAt"
    FROM leads
  `;

  const values = [];

  if (search) {
    query += `
      WHERE
        name ILIKE $1
        OR email ILIKE $1
        OR phone ILIKE $1
    `;

    values.push(`%${search}%`);
  }

  query += `
    ORDER BY created_at DESC
  `;

  const { rows } = await pool.query(query, values);

  return rows;
};

export const findLeadById = async (id) => {
  const query = `
    SELECT
      id,
      name,
      email,
      phone,
      status,
      created_at AS "createdAt"
    FROM leads
    WHERE id = $1
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
};

export const updateLeadStatus = async (id, status) => {
  const query = `
    UPDATE leads
    SET status = $1
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      phone,
      status,
      created_at AS "createdAt"
  `;

  const { rows } = await pool.query(query, [status, id]);

  return rows[0] || null;
};
