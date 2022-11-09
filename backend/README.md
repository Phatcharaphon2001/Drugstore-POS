# User
ดู User ทั้งหมด
GET http://p0nd.ga:27777/user/

ดู User ตาม ID
GET http://p0nd.ga:27777/user/<id>
เช่น
GET http://p0nd.ga:27777/user/636aa114f52ec3b78b2cafcc

เพิ่ม User
POST http://p0nd.ga:27777/user/add
โดยต้องมีข้อมูลดังนี้:
- name
- email
- password (plaintext)

อัปเดตข้อมูล User ตาม ID
POST http://p0nd.ga:27777/user/update
- id
- name
- email
- password (plaintext) (เว้นว่างได้ จะไม่เป็นการอัปเดตรหัสแทน)
(วิธีการลองดูใน axios.js)

# Authentication
เข้าสู่ระบบ
POST /auth/login
- email
- password (plaintext)

# Inventory
ดู Inventory
GET http://p0nd.ga:27777/inventory/

ดู Inventory ตาม ID
GET http://p0nd.ga:27777/inventory/id/<id>

ดู Inventory ตามประเภท (Type)
GET http://p0nd.ga:27777/inventory/type/<type>

เพิ่มข้อมูล Inventory
POST http://p0nd.ga:27777/inventory/update
- name
- type
- unit
- exp
- amount 
- price_origin (ราคาต้นทุน)
- price_sell (ราคาขาย)

อัปเดตข้อมูล Inventory ตาม ID
POST http://p0nd.ga:27777/inventory/update
- id
- name
- type
- unit
- lot