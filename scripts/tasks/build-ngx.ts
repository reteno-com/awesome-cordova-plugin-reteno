import {
  cleanupNgx,
  generateLegacyBundles,
  generateDeclarationFiles,
  transpileNgx,
} from '../build/ngx';

transpileNgx();
generateLegacyBundles();
generateDeclarationFiles();
cleanupNgx();
