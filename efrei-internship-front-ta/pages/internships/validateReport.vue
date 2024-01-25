<template>
    <div>
      <h1>Academic Tutor - Report Validation</h1>
  
      <div v-if="reports.length > 0">
        <h2>Reports to Validate:</h2>
        <ul>
          <li v-for="report in reports" :key="report.id">
            <p><strong>Student:</strong> {{ report.studentName }}</p>
            <p><strong>Title:</strong> {{ report.title }}</p>
            <p><strong>Description:</strong> {{ report.description }}</p>
            <button @click="validateReport(report.id)">Validate Report</button>
          </li>
        </ul>
      </div>
  
      <div v-else>
        <p>No reports to validate.</p>
      </div>
    </div>
  </template>
  
  <script>
    export default {
        data() {
            return {
                reports: [],
            };
        },
        mounted() {
            this.fetchReportsToValidate();
        },
        methods: {
            fetchReportsToValidate() {
            axios.get('/api/documents', {
                params: {
                    type: 'report',
                    validated_by_school: false
                }
                })
                .then(response => {
                    this.reports = response.data;
                })
                .catch(error => {
                    console.error('Error fetching reports:', error);
                });
            },

        
            validateReport(reportId) {
            // Make an API call to validate the report
            // You need to replace this with your actual API endpoint
    
            // Example using Axios:
            // axios.post(`/api/reports/${reportId}/validate`)
            //   .then(response => {
            //     // Handle success
            //     console.log('Report validated successfully');
            //     // Update the reports list after validation
            //     this.fetchReportsToValidate();
            //   })
            //   .catch(error => {
            //     console.error('Error validating report:', error);
            //   });
    
            // Mock data for testing
            console.log(`Report with ID ${reportId} validated successfully`);
            // Update the reports list after validation
            this.fetchReportsToValidate();
            },
        },
    };
</script>
  