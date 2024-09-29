$(document).ready(function () {
    function format(rowData) {
        // Render the row details with the employee dropdown and description
        const employeeOptions = rowData.employees.map(employee => `
            <option value="${employee.name}" ${employee.pending > 5 ? 'disabled' : ''}>
                ${employee.name}
            </option>
        `).join('');

        return `
            <tr class="collapse-content details-row" data-ticket-id="${rowData.ticketID}">
                <td colspan="8">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <strong class="d-flex justify-content-left">Customer Address</strong>
                            <p class="pt-2" style="font-size: 13px;text-align: left;">${rowData.address}</p>
                            <label class="mt-3 d-flex justify-content-left">Employee Name</label>
                            <select class="form-select mt-2 employee-select" disabled>
                                ${employeeOptions}
                            </select>
                            <small class="text-muted mt-2">Pending work: <span class="pending-work">${rowData.employees[0].pending}</span></small>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-6">
                            <strong class="d-flex justify-content-left">Description:</strong>
                            <p style="font-size: 16px;text-align: left;" class="pt-2">${rowData.description}</p>
                            <div class="row">
                               
                                <div class="col-6">
                                     <div class="image-gallery">
                                        <img src="images/profile img.png" alt="Image 1" width="100px">
                                        <div class="image-container">
                                            <img src="images/profile img.png" alt="Image 1">
                                            <div class="overlay">+3</div>
                                        </div>
                                        <div class="thumbnail-container" id="additional-images" style="display: none;">
                                            <img src="images/profile img.png" alt="Additional Image 1">
                                            <img src="images/profile img.png" alt="Additional Image 2">
                                        
                                        </div>
                                    </div>
                                </div>
                                 <div class="col-6">
                                    <button class="btn btn-assign" ${rowData.employees.every(e => e.pending > 5) ? 'disabled' : ''}>
                                        ReAssign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    // Sample data for dynamic row details with 10 total rows
    const rowDetails = [
        {
            ticketID: '001',
            address: 'KING SQUARE OLD NO.1 NEW NO.2, PLOT B 31, 6th Ave, Ashok Nagar, Chennai, Tamil Nadu 600083',
            description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',
            employees: [
                { name: 'Ganesh', pending: 3 },
                { name: 'Rohith', pending: 6 }, // More than 5, should be disabled
                { name: 'Meera', pending: 2 }
            ]
        },
        {
            ticketID: '002',
            address: 'No. 45, Second St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',

            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 5 },
                { name: 'Meera', pending: 1 }
            ]
        },
        {
            ticketID: '003',
            address: 'No. 20, Third St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'Washing machine issue.',
            employees: [
                { name: 'Ganesh', pending: 1 },
                { name: 'Rohith', pending: 3 },
                { name: 'Meera', pending: 4 }
            ]
        },
        {
            ticketID: '004',
            address: 'No. 1, Fourth St, T. Nagar, Chennai, Tamil Nadu 600017',
            description: 'TV not turning on.',
            employees: [
                { name: 'Ganesh', pending: 2 },
                { name: 'Rohith', pending: 7 },
                { name: 'Meera', pending: 4 }
            ]
        },
        {
            ticketID: '005',
            address: 'No. 23, 1st Main Rd, Anna Nagar, Chennai, Tamil Nadu 600040',
            description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',

            employees: [
                { name: 'Ganesh', pending: 3 },
                { name: 'Rohith', pending: 1 },
                { name: 'Meera', pending: 5 }
            ]
        },
        {
            ticketID: '006',
            address: 'No. 50, Fifth St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',
            employees: [
                { name: 'Ganesh', pending: 0 },
                { name: 'Rohith', pending: 3 },
                { name: 'Meera', pending: 8 }
            ]
        },
        {
            ticketID: '007',
            address: 'No. 12, Second St, Nungambakkam, Chennai, Tamil Nadu 600034',
                        description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',

            employees: [
                { name: 'Ganesh', pending: 5 },
                { name: 'Rohith', pending: 6 },
                { name: 'Meera', pending: 4 }
            ]
        },
        {
            ticketID: '008',
            address: 'No. 11, Third St, Kotturpuram, Chennai, Tamil Nadu 600085',
            description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',

            employees: [
                { name: 'Ganesh', pending: 7 },
                { name: 'Rohith', pending: 2 },
                { name: 'Meera', pending: 5 }
            ]
        },
        {
            ticketID: '009',
            address: 'No. 18, Fourth St, Saidapet, Chennai, Tamil Nadu 600015',
            description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',

            employees: [
                { name: 'Ganesh', pending: 3 },
                { name: 'Rohith', pending: 2 },
                { name: 'Meera', pending: 4 }
            ]
        },
        {
            ticketID: '010',
            address: 'No. 7, Fifth St, Adyar, Chennai, Tamil Nadu 600020',
            description: 'The air conditioner is running but not cooling the room effectively, blowing warm air despite long cooling cycles. This could be due to low refrigerant levels, a dirty air filter, a malfunctioning compressor, or a faulty thermostat. To address this issue, check and replace the air filter, and have a professional inspect.',

            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 1 },
                { name: 'Meera', pending: 6 }
            ]
        }
    ];

    // Set the initial assigned employee name in the main table rows
    $('#ticketTable tbody tr').each(function () {
        const ticketID = $(this).find('td:nth-child(2)').text();
        const details = rowDetails.find(detail => detail.ticketID === ticketID);

        // Set initial assigned employee in the table's main row
        if (details && details.employees.length > 0) {
            const initialEmployee = details.employees[0].name;
            $(this).find('.assigned-employee').text(initialEmployee);
        }
    });

    // Initialize DataTables
    const table = $('#ticketTable').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true
    });

    // Expand row details on click
    $('#ticketTable tbody').on('click', 'td.details-control', function () {
        const tr = $(this).closest('tr');
        const row = table.row(tr);
        const ticketID = tr.find('td:nth-child(2)').text(); // Get the ticket ID
        const details = rowDetails.find(detail => detail.ticketID === ticketID);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(details)).show();
            tr.addClass('shown');
        }
    });

    // Reassign button logic
    $('#ticketTable tbody').on('click', '.btn-assign', function () {
        $(this).closest('.details-row').find('.employee-select').prop('disabled', false);
    });

    // Update the assigned employee when an employee is selected
    $('#ticketTable tbody').on('change', '.employee-select', function () {
        const selectedEmployee = $(this).val();
        const detailsRow = $(this).closest('tr.details-row');
        const ticketID = detailsRow.data('ticket-id');

        // Find the corresponding main row based on the ticket ID
        const mainRow = $(`#ticketTable tbody tr:not(.details-row)`).filter(function () {
            return $(this).find('td:nth-child(2)').text() === ticketID;
        });

        // Update the assigned employee in the main table row
        mainRow.find('.assigned-employee').text(selectedEmployee);
        table.row(mainRow).invalidate().draw();
    });
});
