//Steps to install allure playwright report
/*
Step 1: npm install -D allure-playwright
step 2: add the allure-playwright in playwright.config.js file --> defineconfig
        example :   reporter: [ ['html'],
              ['allure-playwright']
            ],
step 3: we can use in command line as well 
        npx playwright test --reporter=allure-playwright

step 4: Execute the test to generate allure result 
step 5: once allure result genrated to generate allure report and open install allure report
step 6: npm install -g allure-commandline
step 7: run allure --version - to see allure is installed 
step 8: after installing npm install -g allure-commandline set the allure path
step 9: run below command to generate allure report and open allure report 
  allure generate ./allure-results -o ./allure-report.  --> Genrate allure report for allure result
  allure open ./allure-report  --> to open allure report
step 10: To generate allure report and open allure report automaticall add below script in package.json file under script

             "scripts": {
                "test": "playwright test",
                "allure:report": "allure generate allure-results --clean && allure open allure-report",
                "test:allure": "playwright test && npm run allure:report"
           },

Run and genereate and open allure report automatically - Add this script in package.json 
 "scripts": {
    "test": "playwright test",
    "allure:report": "allure generate ./allure-results -o ./allure-report --clean; allure open ./allure-report",
    "test:allure": "playwright test; allure generate ./allure-results -o ./allure-report --clean; allure open ./allure-report",
    "test:allure:file": "playwright test $npm_config_test; allure generate ./allure-results -o ./allure-report --clean; allure open ./allure-report"
  },

  run specifc test file dynamically  :
  
  npm run test:allure:file --test=tests/staticdropdown.spec.js

*/