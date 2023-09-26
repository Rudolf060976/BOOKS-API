const createError = require('http-errors');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');


const getSecretValue = async (secretName) => {

	const client = new SecretsManagerClient({ region: 'us-east-1' });

	try {
	
		const response = await client.send(
			new GetSecretValueCommand({
				SecretId: secretName,
				VersionStage: "AWSCURRENT"
			})
		);

		return response.SecretString;

	} catch (error) {
		createError(error.status || 500, error.message);
	}
}

module.exports = {
	getSecretValue
}