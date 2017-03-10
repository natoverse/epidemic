var controls = {
    init: function() {
        $('#toggle').click(toggle);
        // generate dropdown options for all the the transmission vectors we've defined
        var options = Object.keys(vectors).map(function (key) {
            var vector = vectors[key];
            return '<option value="' + key + '">' + vector.name + '</option>';
        });
        $('#vector').append(options);
        $('#vector').change(function (e) {
            agents.setVector(vectors[e.target.value]);
            agents.resetInfections();
        });
    }
};