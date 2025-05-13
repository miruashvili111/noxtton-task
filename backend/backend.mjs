import DHT from 'hyperdht';
import b4a from 'b4a';
const { IPC } = BareKit

async function joinDHT(publicKeyHex) {
  try {

    const publicKey = b4a.from(publicKeyHex, 'hex')

    const dht = new DHT({ bootstrap: ['bootstrap1.holepunch.to:49737', 'bootstrap2.holepunch.to:49737'] })
    const conn = dht.connect(publicKey)

    conn.on('data', (data) => {
      try {
        const message = JSON.parse(data.toString())
        console.log('message', message)
      } catch (error) {
        console.log('error', error)
      }
    })

    global.dhtConnection = conn

    Bare.on('teardown', () => {
      dht.destroy()
    })

    return {response: 'Connected to DHT server'}
  } catch (error) {
    console.error('dht error:', error.message, error.stack)
    return { error: error.message }
  }
}

IPC.setEncoding('utf8')
IPC.on('data', async (data) => {
  let response
  try {
    const message = JSON.parse(data)
    const pairingInvite = message.pairingInvite || ''
    console.log(message, pairingInvite, 'parinig and invite')

    if (message.type === 'init') {
      response = pairingInvite ? await joinDHT(pairingInvite) : { response: 'No public key provided' }
    }
  } catch (error) {
    console.error('IPC error:', error.message, error.stack)
    response = { error: error.message }
  }

  console.log('response:', response)
  IPC.write(JSON.stringify(response))
})

IPC.write(JSON.stringify({ response: 'DHT backend ready' }))