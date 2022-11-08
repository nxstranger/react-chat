

const generateKeysPair = () => {
    return window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: {name: "SHA-256"},
        },
        false,
        ["encrypt", "decrypt"]
    )
        .then(function(key){
            // returns a keypair object
            console.log(key);
            console.log(key.publicKey);
            console.log(key.privateKey);
            return key;
        })
        .catch(function(err){
            console.error(err);
        });
}

const asyncGenerateKeysPair = async () => await generateKeysPair();

export default {
    asyncGenerateKeysPair,
    generateKeysPair,
}
