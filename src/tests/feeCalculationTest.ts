/**
 * Fee Calculation Test Suite
 * 
 * This test validates fee calculations for all 8 asset categories
 * ensuring accuracy of base property values, percentages, and fixed amounts.
 */

import { 
  CATEGORY_FEE_STRUCTURES, 
  calculateFeeAmount, 
  calculateGrossTotal, 
  getFeeStructureByCategory 
} from '../config/feeStructure';

interface TestResult {
  category: string;
  categoryId: string;
  basePropertyValue: number;
  expectedTotalPercentage: number;
  calculatedTotalPercentage: number;
  expectedGrossTotal: number;
  calculatedGrossTotal: number;
  feeItemTests: Array<{
    feeId: string;
    feeName: string;
    expectedPercentage: number;
    expectedFixedAmount: number;
    calculatedAmount: number;
    passed: boolean;
  }>;
  overallPassed: boolean;
  issues: string[];
}

/**
 * Run comprehensive fee calculation tests
 */
export function runFeeCalculationTests(): TestResult[] {
  const testResults: TestResult[] = [];

  // Test each category
  CATEGORY_FEE_STRUCTURES.forEach(feeStructure => {
    console.log(`\n🧪 Testing Fee Calculations for: ${feeStructure.categoryName}`);
    
    const result: TestResult = {
      category: feeStructure.categoryName,
      categoryId: feeStructure.categoryId,
      basePropertyValue: feeStructure.basePropertyValue,
      expectedTotalPercentage: feeStructure.totalPercentage,
      calculatedTotalPercentage: 0,
      expectedGrossTotal: feeStructure.grossTotal,
      calculatedGrossTotal: 0,
      feeItemTests: [],
      overallPassed: true,
      issues: []
    };

    let totalCalculatedPercentage = 0;
    let totalCalculatedAmount = 0;

    // Test each fee item
    feeStructure.feeItems.forEach(feeItem => {
      const calculatedAmount = calculateFeeAmount(
        feeStructure.basePropertyValue, 
        feeItem.percentage
      );

      const feeTest = {
        feeId: feeItem.id,
        feeName: feeItem.name,
        expectedPercentage: feeItem.percentage,
        expectedFixedAmount: feeItem.fixedAmount,
        calculatedAmount,
        passed: calculatedAmount === feeItem.fixedAmount
      };

      if (!feeTest.passed) {
        result.issues.push(
          `${feeItem.name}: Expected ${feeItem.fixedAmount}, got ${calculatedAmount}`
        );
        result.overallPassed = false;
      }

      totalCalculatedPercentage += feeItem.percentage;
      totalCalculatedAmount += calculatedAmount;
      result.feeItemTests.push(feeTest);
    });

    // Calculate gross total
    const calculatedGrossTotal = calculateGrossTotal(
      feeStructure.basePropertyValue,
      totalCalculatedPercentage
    );

    result.calculatedTotalPercentage = Math.round(totalCalculatedPercentage * 100) / 100;
    result.calculatedGrossTotal = calculatedGrossTotal;

    // Validate total percentage
    if (Math.abs(result.calculatedTotalPercentage - result.expectedTotalPercentage) > 0.01) {
      result.issues.push(
        `Total percentage mismatch: Expected ${result.expectedTotalPercentage}%, got ${result.calculatedTotalPercentage}%`
      );
      result.overallPassed = false;
    }

    // Validate gross total
    if (result.calculatedGrossTotal !== result.expectedGrossTotal) {
      result.issues.push(
        `Gross total mismatch: Expected ${result.expectedGrossTotal}, got ${result.calculatedGrossTotal}`
      );
      result.overallPassed = false;
    }

    testResults.push(result);
  });

  return testResults;
}

/**
 * Display test results in console
 */
export function displayTestResults(results: TestResult[]): void {
  console.log('\n📊 FEE CALCULATION TEST RESULTS');
  console.log('================================');

  let overallPassed = true;
  let totalTests = 0;
  let passedTests = 0;

  results.forEach((result, index) => {
    const status = result.overallPassed ? '✅ PASS' : '❌ FAIL';
    console.log(`\n${index + 1}. ${result.category}: ${status}`);
    
    if (result.overallPassed) {
      passedTests++;
      console.log(`   💰 Base Value: $${result.basePropertyValue.toLocaleString()}`);
      console.log(`   📈 Total Fees: ${result.calculatedTotalPercentage}%`);
      console.log(`   🏦 Gross Total: $${result.calculatedGrossTotal.toLocaleString()}`);
    } else {
      overallPassed = false;
      console.log(`   ❗ Issues Found:`);
      result.issues.forEach(issue => {
        console.log(`      - ${issue}`);
      });
    }
    
    totalTests++;
  });

  console.log('\n📋 SUMMARY');
  console.log('==========');
  console.log(`Total Categories Tested: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${totalTests - passedTests}`);
  console.log(`Overall Status: ${overallPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

  if (overallPassed) {
    console.log('\n🎉 All fee calculations are accurate and working correctly!');
  } else {
    console.log('\n⚠️  Some fee calculations need attention. Please review the issues above.');
  }
}

/**
 * Test fee structure retrieval by category ID
 */
export function testFeeStructureRetrieval(): boolean {
  console.log('\n🔍 Testing Fee Structure Retrieval...');
  
  const testCategories = [
    'data-centers-edge',
    'cold-storage-hubs', 
    'last-mile-logistics',
    'coworking-flexible-office',
    'renewable-industrial-parks',
    'high-street-flagship-retail',
    'hotels-resorts',
    'mixed-use-complexes'
  ];

  let allPassed = true;

  testCategories.forEach(categoryId => {
    const feeStructure = getFeeStructureByCategory(categoryId);
    if (!feeStructure) {
      console.log(`❌ Failed to retrieve fee structure for: ${categoryId}`);
      allPassed = false;
    } else {
      console.log(`✅ Retrieved fee structure for: ${feeStructure.categoryName}`);
    }
  });

  // Test non-existent category
  const nonExistent = getFeeStructureByCategory('non-existent-category');
  if (nonExistent !== undefined) {
    console.log(`❌ Should return undefined for non-existent category`);
    allPassed = false;
  } else {
    console.log(`✅ Correctly returns undefined for non-existent category`);
  }

  return allPassed;
}

/**
 * Run all tests
 */
export function runAllFeeTests(): void {
  console.log('🚀 Starting Comprehensive Fee Calculation Tests...\n');
  
  // Test fee structure retrieval
  const retrievalPassed = testFeeStructureRetrieval();
  
  // Test fee calculations
  const calculationResults = runFeeCalculationTests();
  
  // Display results
  displayTestResults(calculationResults);
  
  if (retrievalPassed) {
    console.log('\n✅ Fee structure retrieval tests passed');
  } else {
    console.log('\n❌ Fee structure retrieval tests failed');
  }
}

// Export for use in other files
export { TestResult };