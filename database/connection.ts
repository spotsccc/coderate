import { format } from 'util'
import { MongoClient } from 'mongodb'

const url = format(
	'mongodb://%s:%s@%s/?replicaSet=%s&authSource=%s&ssl=true',
	'main',
	'415065QqWw',
	['rc1b-9rvpw0mfhwge7jh6.mdb.yandexcloud.net:27018'].join(','),
	'rs01',
	'db1',
)

const options = {
	useNewUrlParser: true,
	tlsAllowInvalidHostnames: true,
	tlsAllowInvalidCertificates: true,
	sslCert: '/usr/local/share/ca-certificates/Yandex/YandexInternalRootCA.crt',
}

export const client = new MongoClient(url, options)
