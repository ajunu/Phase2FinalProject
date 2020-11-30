var myTable;

$(document).ready(function() {
    BindItemTable();
    PopulateItemsTable();
});

function BindItemTable() {
    myTable = $(".teachersList").DataTable({
        "deferRender": true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "sDom": 'lfrtip',
        "bDestroy": true
    });
}

function PopulateItemsTable() {
    $.ajax({
        type: "GET",
        url: "ListTeachers",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            var jsonObject = response.response;
            var result = jsonObject.map(function(item) {
                var editButton = '<a title="Click to edit" href="editTeachers.jsp?teacherId=' + item.teacherId + '" class="btn btn-info btn-circle btn-sm"><i class="fas fa-info-circle"></i></a>';
                var spaceInHtml = '&nbsp&nbsp&nbsp&nbsp';
                var deleteButton1 = '<button  title="Click to delete" onclick="deleteTeachers(' + item.teacherId + ',' + "'" + item.firstName + "'" + ')"  class = "btn btn-danger btn-circle btn-sm" id="deleteTeachersBtn" ><i class="fas fa-trash"></i></button> '
                var result = [];
                result.push(item.firstName);
                result.push(item.contactNumber);
                result.push(item.qualification);
                result.push(item.gender);
                result.push(item.createdDtDisp);
                result.push(editButton + spaceInHtml + deleteButton1);
                return result;
            });
            myTable.rows.add(result);
            myTable.draw();
        },
        failure: function() {
            $(".teachersList").append(" Error when fetching data please contact administrator");
        }
    });

}

function deleteTeachers(id, Name) {

    if (confirm('Are you sure you want to delete the teacher ' + Name + ' ?')) {
		buttonDisableEnable("#deleteTeachersBtn", true);
        $.ajax({
            type: "POST",
            url: "DeleteTeachers",
            data: { "teachersId" :id },
            cache: false,
            success: function(data) {
                buttonDisableEnable("#deleteTeachersBtn", false);
                if (data.success == true) {
                    snackBarMessage(data.message);
					location.reload(true);
                } else {
                    snackBarMessage(data.message);
                }
            },
            error: function(e) {
                buttonDisableEnable("#deleteTeachersBtn", false);
                snackBarMessage('Error While logging to the Panel, Kindly Contact Admin!');
            }

        });

    } else {
		return false;
    }

}