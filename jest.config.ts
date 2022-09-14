const config: any = {
  verbose: true,
  moduleDirectories: [
    'node_modules',
+   // add the directory with the test-utils.js file, for example:
+   'shared', // a utility folder
+    __dirname, // the root directory
  ],
};

export default config;