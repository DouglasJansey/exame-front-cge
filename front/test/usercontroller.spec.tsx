import UserController from '../controller/userController/userController';

jest.mock('../controller/userController/userController', () => {
    return {
        __esModule: true,
        default: jest.fn(),
    }
    });
    const mockedUserController = UserController as jest.MockedClass<typeof UserController>

    const mockCreateUser = jest.fn() 
    const mockUpdateUser = jest.fn() 
    const mockDeleteUser = jest.fn() 

    mockedUserController.prototype.createUser = mockCreateUser;
    mockedUserController.prototype.updateUser = mockUpdateUser;
    mockedUserController.prototype.deleteUser = mockDeleteUser;

    mockCreateUser.mockResolvedValue({id:'sasda8sday21341asd', name: 'douglas', email: 'douglas@gmail.com', password: '123456789'})
    mockUpdateUser.mockImplementation( async (id: string, data: any)=>{
        if(id === 'sasda8sday21341asd'){
            return {user:{id,  name: 'douglas', email: 'douglas@gmail.com', password: '123456789'}}
        }
    })
    mockDeleteUser.mockImplementation( async (id: string, userId: string)=>{
        if(id === userId){
            return true
        }
    })

describe('controller getUser', ()=>{
    const getUser = new UserController()
    it('should return an object', ()=>{
        expect(getUser).not.toBeNull()
    })
})

describe('controller createUser',  ()=>{
    it('should have id', async () => {
    const user = {
        name:'Douglas',
        email:'douglas.jansey@gmail.com',
        password:'123456789'
    }
    const createdUser = await mockedUserController.prototype.createUser(user)
        expect(createdUser).toHaveProperty('id')
    })
})
describe('controller updateUser',  ()=>{
    it('should return new name', async () => {    
    const id = 'sasda8sday21341asd';

    const data = {
        name: 'Douglas',
    }
    const updatedUser = await mockedUserController.prototype.updateUser(id, data)
        expect(updatedUser.user.name).toBe('douglas')
    })
})
describe('controller updateUser',  ()=>{
    it('should deleted user', async () => {    
    const id = 'sasda8sday21341asd';
    const userId = 'sasda8sday21341asd';
    const deletedUser = await mockedUserController.prototype.deleteUser(id, userId)
        expect(deletedUser).toBe(true)
    })
})