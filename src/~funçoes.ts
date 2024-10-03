import jwt, { SignOptions } from 'jsonwebtoken'

const secret = 'hiago'
const expiresIn = '1h'

const payload = {
    data: {
        id: 1,
        username: 'admin',
        email: 'teste@teste.com' //shitten >:(
    }
}

jwt.sign(payload, secret, { expiresIn }, (err, token) => {
    if (err) return console.error(err) 
        console.log(token)

    jwt.verify(token as string, secret, (err, decoded) => {
        if (err) return console.error(err)
        console.log(decoded)
      })

})
//jwt.sign(payload, secret, { expiresIn }, (err, token) => {
//    if (err) return console.error(err) 
//        console.log(token)
//
//    jwt.verify(token as string, secret, (err, decoded) => {
//        if (err) return console.error(err)
//        console.log(decoded)
//      })
//
//PROMISIFY JWT
//

const sign = async (payload: any, secret: string, options: SignOptions) => {
    return new Promise ((resolve, reject)=> {
        jwt.sign(payload, secret, options, (err, token) =>{
            if (err) return reject(err)
                resolve(token)
        })
    })   
}

void async function () {
    try {
    const token  = await sign (payload, secret, { expiresIn})
    console.log("token", token)

    const verifieData = await verify(<string>token, secret)
    console.log("verifiedData", verifieData)

    const decodedData = jwt.decode(<string>token)
    console.log("decodedData", decodedData)
    } catch (e) {
        if(e instanceof jwt.TokenExpiredError)
            return console.error("token not active")
        
        if (e instanceof jwt.NotBeforeError)
            return console.error("token not active")

        if (e instanceof jwt.JsonWebTokenError)
            return console.error(e)
    console.error("esta mensagem não deveria aparecer", e)
    }
}()  

