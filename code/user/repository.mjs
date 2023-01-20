let users = [
    {id: 1, email:'vinicius@gmail.com', password: '123', name: "vinicius j noveli", age: 22, city: "Curitiba", state: "PR"},
    {id: 2, email:'fernanda@gmail.com', password: '321', name: "Fernanda fonseca lima", age: 22, city: "São Paulo", state: "SP"}
];

let id = 3;

function formatUser(user) {
    if (!user) return user;    
    return {...user, password: undefined};
}

export async function loadById(id) {
    return formatUser(users.find(u => u.id === id));
}

export async function loadByCredentials(email, password) {
    return formatUser(
        users.find(u => 
            u.email === email && 
            u.password === password
        )
    );
}

export async function loadNewAccount(user){
    const aux = Object.assign({id: id++}, user);
    users.push(aux);
    return aux;
}