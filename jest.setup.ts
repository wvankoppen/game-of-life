import 'jest-preset-angular/setup-jest';

import failOnConsole from 'jest-fail-on-console';

failOnConsole();

// or with options:
failOnConsole({ shouldFailOnWarn: false });
