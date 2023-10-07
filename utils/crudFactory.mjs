export default {
    getAll: (Model) => async () => await Model.find(),
    create: (Model) => async (data) => {
        const entity = new Model(data);
        return await entity.save();
    },
};
