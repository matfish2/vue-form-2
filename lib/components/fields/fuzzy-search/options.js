module.exports = function(fuzzySearch) {
	return {
		matcher: function(params, data) {

			var pattern = params.term;
			var str = data.text;

			if (!pattern) return data;

			var res = fuzzySearch(pattern, str);

			if (res[0])  {
				data.score = res[1];
				return data;
			}

			return null;
		},
		sorter: function(data) {

			data.sort(function (a, b) {

				if (a.score < b.score) {
					return 1;
				}
				if (a.score > b.score) {
					return -1;
				}

				return 0;
			});

			return data;

		}	
	}
	
}