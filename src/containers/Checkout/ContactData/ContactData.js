import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'

class ContactData extends Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }

    }
    render(){
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input classsName={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input classsName={classes.Input} type="text" name="email" placeholder="Your Mail"/>
                    <input classsName={classes.Input} type="text" name="street" placeholder="street"/>
                    <input classsName={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }

}

export default ContactData;