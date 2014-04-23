'use strict';

var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');
var chalk   = require('chalk');


var FrodevGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You\'re using the fantastic Frodev generator.'));

        var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Continue?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.someOption = props.someOption;

            done();
        }.bind(this));
    },

    app: function () {

        this.directory(__dirname + '/templates', './');

        // this.mkdir('app');
        // this.mkdir('app/templates');

        // this.copy('_package.json', 'package.json');
        // this.copy('_bower.json', 'bower.json');
    }
});

module.exports = FrodevGenerator;