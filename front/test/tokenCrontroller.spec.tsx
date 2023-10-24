import  TokenController  from '../controller/tokenController/tokenController'
jest.mock('../controller/tokenController/tokenController',()=>{
    return {
        __esModule: true,
        default: jest.fn(),
    }
})
const mockTokenController = TokenController as jest.MockedClass<typeof TokenController>
const mockTokenGenerate = jest.fn();

mockTokenController.prototype.generateToken = mockTokenGenerate

mockTokenGenerate.mockImplementation(async (email: string, password: string) =>{
    const savedEmail= 'douglas@gmail.com';
    const savePass = '123';
    const token = 'TOKEN';
    if(savedEmail === email && savePass === password){
        return true
    }
})


describe('Token Controller Teste', ()=>{
    it('should return a token', async ()=>{
           const email= 'douglas@gmail.com'
           const password= '123'

        const tokenMocked = await mockTokenController.prototype.generateToken(email,password)
        expect(tokenMocked).toBe(true)
    })
})