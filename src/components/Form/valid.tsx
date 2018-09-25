
export interface profileData {
	first_name: string;
	last_name:  string;
	city_code:  string;
	phone:  string;
	mail: string;
	post:  string;
	subdivisions:  string;
} 

export function isValid(profile:profileData):boolean {
	if (profile.first_name !== '' 
		&& profile.last_name !== '' 
		&& profile.city_code !== '' && profile.city_code.length === 3
		&& profile.phone !== '' && profile.phone.length === 7){
		console.log('valid success');
		return true;
	}
	else{
		console.log('valid error');
		return false;
	}
}