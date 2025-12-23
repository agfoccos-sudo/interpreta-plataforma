const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually read .env.local
const envPath = path.resolve(__dirname, '../.env.local');
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
    console.error('Could not read .env.local', e);
}

const envVars = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, ''); // remove quotes
        envVars[key] = val;
    }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars even after reading .env.local');
    // process.exit(1); 
}

console.log('Using URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    // Try to insert a dummy message with recipient_id to see if it fails explicitly on column missing
    // or select * and see keys
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error selecting:', error);
    } else {
        if (data && data.length > 0) {
            console.log('Columns:', Object.keys(data[0]));
        } else {
            console.log('Table empty. Trying to list columns via RPC or just logging success connection.');
            // Since we can't easily DESCRIBE table via client, we will assume if select works, connection is good.
            // We will try to update a non-existent row with the column to see if it complains about column
            const { error: updateError } = await supabase
                .from('messages')
                .update({ recipient_id: 'test' })
                .eq('id', 'non-existent-id');

            if (updateError && updateError.message.includes('column "recipient_id" of relation "messages" does not exist')) {
                console.log('Column recipient_id DOES NOT exist.');
            } else if (!updateError) {
                console.log('Update command ran (even if 0 rows). This usually means column EXISTS.');
            } else {
                console.log('Update error:', updateError.message);
            }
        }
    }
}

checkSchema();
