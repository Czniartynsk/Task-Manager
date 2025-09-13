import request from 'supertest'
import { app } from './app'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWJqZWN0IjoiZDIzMTYwODUtNGJkYi00YWFiLTllOTktM2M3YzA3MjgwNDY0IiwiaWF0IjoxNzU3NzkzOTQ3LCJleHAiOjE3NTc4ODAzNDd9.oGc1wH4h8gUHYmlotJxt8vElyaUyijr41UTi8Dk0vtc'

describe('Users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Adriana',
        email: `adriana${Date.now()}@gmail.com`,
        password: '123456',
      })

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
  const teamId = '5d60645a-a6db-4c02-b175-5da29707492d'
  const assignedTo = 'bf8d4d44-d76e-4791-abba-2d879cb491fa'
  let taskId: string

  beforeAll(async () => {
    const response = await request(app)
      .post(`/teams/${teamId}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tarefa 2',
        description: 'Time 2 Descrição tarefa 2',
        priority: 'low',
        assignedTo,
      })

    console.log('Create Task Response:', response.body)
    expect(response.status).toBe(201)
    taskId = response.body.id
  })

  it('should show a task', async () => {
    const response = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    console.log('Show Task Response:', response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('title')
  })

  it('should update a task', async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Template mensagem whats',
        description: 'Enviar para o facebook um modelo de mensagem para envio do contato',
        priority: 'low',
        assignedTo,
      })

    console.log('Update Task Response:', response.body)
    expect(response.status).toBe(200)
  })

  it('should delete a task', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    console.log('Delete Task Response:', response.body)
    expect(response.status).toBe(204)
  })
})