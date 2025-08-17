const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all contacts
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM contacts';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching contacts:',err);
      return res.status(500).send('Database error');
    }
    res.render('contacts', { contacts: results });
  });
});

// POST /contacts/add → add a new contact to the database
router.post('/add', (req, res) => {
  const { name, email, phone } = req.body;
  const sql = 'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)';
  
  db.query(sql, [name, email, phone], (err, results) => {
    if (err) {
      console.error('Error adding contact:', err);
      return res.status(500).send('Database error');
    }
    // After inserting, redirect back to the contacts page
    res.redirect('/contacts');
  });
});

// GET /contacts/edit/:id → show form to edit a contact
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM contacts WHERE id = ?';
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching contact:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) {
      return res.status(404).send('Contact not found');
    }
    res.render('edit_contact', { contact: results[0] });
  });
});

// POST /contacts/edit/:id → update contact in database
router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const sql = 'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?';

  db.query(sql, [name, email, phone, id], (err, results) => {
    if (err) {
      console.error('Error updating contact:', err);
      return res.status(500).send('Database error');
    }
    res.redirect('/contacts');
  });
});

// GET /contacts/delete/:id → delete contact from database
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contacts WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting contact:', err);
      return res.status(500).send('Database error');
    }
    res.redirect('/contacts');
  });
});


module.exports = router;
