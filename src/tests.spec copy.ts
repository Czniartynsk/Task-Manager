// import request from 'supertest'
// import { app } from './app'

// describe("users", () => {
//     it("should create user", async () => {
//         const response = await request(app).get("/users")
    
//         expect(response.statusCode).toBe(200)
//     })
// })

// SESSIONS
// let token: string

// beforeAll(async () => {
//   const response = await request(app).post('/sessions').send({
//     email: 'bruno@gmail.com',
//     password: '123456',
//   })

//   token = response.body.token
//   expect(token).toBeDefined()
// })

// // CRIAR USUÁRIO
// it('should create a new user', async () => {
//   const response = await request(app).post('/users').send({
//     name: 'Arthur',
//     email: 'arthur@gmail.com',
//     password: '123456',
//   })

//   expect(response.status).toBe(201)
//   expect(response.body).toHaveProperty('id')
// })

// // CRIAR TIME
// it('should create a new team', async () => {
//   const response = await request(app)
//     .post('/teams')
//     .set('Authorization', `Bearer ${token}`)
//     .send({ name: 'Time 3' })

//   expect(response.status).toBe(201)
//   expect(response.body).toHaveProperty('id')
// })

// // ATUALIZAR TIME
// it('should update a team', async () => {
//   const teamId = '5d60645a-a6db-4c02-b175-5da29707492d'

//   const response = await request(app)
//     .put(`/teams/${teamId}`)
//     .set('Authorization', `Bearer ${token}`)
//     .send({
//       name: 'Time 1',
//       description: 'Descrição do Time 1',
//     })

//   expect(response.status).toBe(200)
// })

// // INSERIR MEMBRO NO TIME
// it('should insert a member into a team', async () => {
//   const teamId = '00e113ff-36cc-4e92-8390-b2721e6691e3'

//   const response = await request(app)
//     .post(`/teams/${teamId}/members`)
//     .set('Authorization', `Bearer ${token}`)
//     .send({
//       usersId: ['38a4a6d0-f3b1-4581-b393-75c24a8153fd'],
//     })

//   expect(response.status).toBe(200)
// })

// // CRIAR TAREFA
// it('should create a task for a team', async () => {
//   const teamId = '5d60645a-a6db-4c02-b175-5da29707492d'

//   const response = await request(app)
//     .post(`/teams/${teamId}/tasks`)
//     .set('Authorization', `Bearer ${token}`)
//     .send({
//       title: 'Tarefa 0',
//       description: 'Time 2 Descrição tarefa 4',
//       priority: 'low',
//       assignedTo: 'bf8d4d44-d76e-4791-abba-2d879cb491fa',
//     })

//   expect(response.status).toBe(201)
// })

// // MOSTRAR TAREFA
// it('should show a task', async () => {
//   const taskId = 'bcb305f3-d3c7-40dd-9c34-7e6fa92a96d1'

//   const response = await request(app)
//     .get(`/tasks/${taskId}`)
//     .set('Authorization', `Bearer ${token}`)

//   expect(response.status).toBe(200)
//   expect(response.body).toHaveProperty('title')
// })

// // ATUALIZAR TAREFA
// it('should update a task', async () => {
//   const taskId = '3c4ee233-e033-4fa6-9220-c49f1e4affa1'

//   const response = await request(app)
//     .put(`/tasks/${taskId}`)
//     .set('Authorization', `Bearer ${token}`)
//     .send({
//       title: 'Template mensagem whats',
//       description: 'Colocar o modelo de mensagem no CRM',
//       priority: 'low',
//       assignedTo: 'bf8d4d44-d76e-4791-abba-2d879cb491fa',
//     })

//   expect(response.status).toBe(200)
// })

// it('should delete a task', async () => {
//   const taskId = '3c4ee233-e033-4fa6-9220-c49f1e4affa1'

//   const response = await request(app)
//     .delete(`/tasks/${taskId}`)
//     .set('Authorization', `Bearer ${token}`)

//   expect(response.status).toBe(204)
// })

import request from 'supertest'
import { app } from './app'

// let token: string
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWJqZWN0IjoiZDIzMTYwODUtNGJkYi00YWFiLTllOTktM2M3YzA3MjgwNDY0IiwiaWF0IjoxNzU3NzkzOTQ3LCJleHAiOjE3NTc4ODAzNDd9.oGc1wH4h8gUHYmlotJxt8vElyaUyijr41UTi8Dk0vtc"

beforeAll(async () => {
  const response = await request(app).post('/sessions').send({
    email: 'bruno@gmail.com',
    password: '123456',
  })

  // token = response.body.token
})

describe('Users', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Adriana',
      email: 'adriana2@gmail.com',
      password: '123456',
    }).set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})

describe('Teams', () => {
  it('should create a new team', async () => {
    const response = await request(app)
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Time 2' })

    expect(response.status).toBe(201)
  })

  it('should update a team', async () => {
    const teamId = '00e113ff-36cc-4e92-8390-b2721e6691e3'

    const response = await request(app)
      .put(`/teams/${teamId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Time 0',
        description: 'Descrição do Time 0',
      })

    expect(response.status).toBe(200)
  })

  it('should insert a member into a team', async () => {
    const teamId = '00e113ff-36cc-4e92-8390-b2721e6691e3'

    const response = await request(app)
      .post(`/teams/${teamId}/members`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        usersId: ['38a4a6d0-f3b1-4581-b393-75c24a8153fd'],
      })

    expect(response.status).toBe(201)
  })
})

describe('Tasks', () => {
  it('should create a task for a team', async () => {
    const teamId = '5d60645a-a6db-4c02-b175-5da29707492d'

    const response = await request(app)
      .post(`/teams/${teamId}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tarefa 2',
        description: 'Time 2 Descrição tarefa 2',
        priority: 'low',
        assignedTo: 'bf8d4d44-d76e-4791-abba-2d879cb491fa',
      })

    expect(response.status).toBe(201)
  })

  it('should show a task', async () => {
    const taskId = 'e66e1aae-8347-45e6-91f4-4b9336e66550'

    const response = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

  it('should update a task', async () => {
    const taskId = 'adc5b57b-7228-4a0c-bbb1-f83fd34123ce'

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Template mensagem whats',
        description: 'Enviar para o facebook um modelo de mensagem para envio do contato',
        priority: 'low',
        assignedTo: 'bf8d4d44-d76e-4791-abba-2d879cb491fa',
      })

    expect(response.status).toBe(200)
  })

  it('should delete a task', async () => {
    const taskId = 'a8bc3988-3de0-472b-9e16-9d61f5fc2b36'

    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204)
  })
})