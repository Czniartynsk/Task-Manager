import type { Config } from 'jest'

const config: Config = {
    // Se um falhar já para os testes
    bail: true,
    // Usando ttypescript com o jest
    preset: "ts-jest",
    // usando em ambiente node
    testEnvironment: "node"
}

export default config