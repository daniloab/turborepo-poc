import { GraphQLSchema } from 'graphql';

import QueryType from './QueryType';

const _schema = new GraphQLSchema({
    query: QueryType,
});

export const schema = _schema;
