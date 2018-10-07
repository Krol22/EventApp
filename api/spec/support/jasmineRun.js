import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfig({
    spec_dir: 'src',
    spec_files: [
        '**/*.spec.js',
    ]
});
jasmine.execute();