export const mockDbWithQueryResult = (res) => ({
    query: jest.fn(() => Promise.resolve({
        rows: res,
        command: '',
        rowCount: res.length,
        oid: 0,
        fields: [],
    }))
});
//# sourceMappingURL=index.js.map