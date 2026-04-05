export const getGraphQLConfig = () => {
	return {
		path: '/api/mygraphql',
		introspection: true,
		playground: true,
		autoSchemaFile: `${process.cwd()}/src/schema/schema.gql`,
		sortSchema: true,
		context: ({ req, res }) => ({
			req,
			res,
		}),
		formatError: (err) => ({
			message: err.message,
			status: err.extensions.code,
		}),
	}
}
