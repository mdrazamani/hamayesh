// NestedCRUDUtils.mjs

/**
 * A function to handle adding a new item to a nested array of documents.
 */
export const addNestedDocument = async (
    Model,
    mainDocId,
    nestedField,
    itemData
) => {
    const mainDocument = await Model.findById(mainDocId);
    if (!mainDocument) {
        throw new Error("Main document not found");
    }
    mainDocument[nestedField].push(itemData);
    await mainDocument.save();
    return mainDocument;
};

/**
 * A function to handle updating an item in a nested array of documents.
 */
export const updateNestedDocument = async (
    Model,
    mainDocId,
    nestedField,
    itemId,
    itemData
) => {
    // Construct the update object to target only the specified fields within the nested document
    const update = { $set: {} };
    for (const [key, value] of Object.entries(itemData)) {
        update.$set[`${nestedField}.$.${key}`] = value;
    }

    // Use array filters to specify which element of the array to update
    const result = await Model.findOneAndUpdate(
        { _id: mainDocId, [`${nestedField}._id`]: itemId },
        update,
        {
            new: true,
            arrayFilters: [{ [`${nestedField}._id`]: itemId }],
        }
    );

    if (!result) {
        throw new Error("Item not found");
    }

    return result;
};

/**
 * A function to handle deleting an item from a nested array of documents.
 */
export const deleteNestedDocument = async (
    Model,
    mainDocId,
    nestedField,
    itemId
) => {
    const result = await Model.findOneAndUpdate(
        { _id: mainDocId },
        { $pull: { [nestedField]: { _id: itemId } } },
        { new: true }
    );

    if (!result) {
        throw new Error("Item not found");
    }

    return result;
};
