import axios from 'axios';
import alert from './alert'
import loader from './loader'

exports.profileSubmit = async (data) => {
    try {
        // const name = document.getElementById('name').value;
        // const positions = document.getElementById('positions').value;
        // const school = document.getElementById('school').value;
        // const qualification = document.getElementById('qualification').value;
        // const field_of_teaching = document.getElementById('field_of_teaching').value;

        const res = await axios({
            method: "POST",
            url: '/api/v0/dataform/profile',
            data
        });
        if (res.data.status == "success") {
            loader.hideLoder();
            alert.show("success", "Successfully updated....!", "form-content");
            window.setTimeout(() => {
                location.assign('/facultyzone/index');
            }, 5000);
        }
    } catch (err) {
        // console.log(err);
        loader.hideLoder();
        alert.show("error", err.response.data.message, "form-content");
        setTimeout(alert.hide, 4000);
    }
}