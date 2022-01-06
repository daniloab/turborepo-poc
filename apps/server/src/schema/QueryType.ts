import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { GraphQLContext } from '../types/context';

// @ts-ignore
import pkgjson from '../../package.json';

const QueryType = new GraphQLObjectType<
    Record<string, unknown>,
    GraphQLContext
    >({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        id: globalIdField('Query'),
        version: {
            type: GraphQLString,
            resolve: () => pkgjson.version,
        }
    }),
})

export default QueryType;