'use strict';


export default function collectionStore(options) {

	options = Object.assign({
		idAttr: 'id',
		getters: {},
		mutations: {},
		actions: {}
	}, options);


	return {
		namespaced: true,
		state: {
			collection: []
		},
		getters: Object.assign({
			$all(state) {
				return state.collection;
			},
			$byId(state) {
				return (id) => state.collection.find(e => e[options.idAttr] === id);
			}
		}, options.getters),
		mutations: {
			$assign(state, model) {
				let existing = state.collection.find(i => i[options.idAttr] === model[options.idAttr]);
				if(existing) {
					Object.assign(existing, model);
				} else {
					state.collection.push(model);
				}
			},
			$remove(state, model) {
				let existing = state.collection.find(i => i[options.idAttr] === model[options.idAttr]);

				let index = state.collection.indexOf(existing);

				if(index !== -1) {
					state.collection.splice(index, 1);
				}
			},
			...options.mutations
		},
		actions: options.actions
	}

};
