export const val={
    apps: [
        {
            name: 'webapp',
            script: 'npm',
            args: 'start',
            error_file: '/home/ec2-user/logs/webapp-err.log',
            combine_logs: true,
            out_file: '/home/ec2-user/logs/webapp-out.log',
            log_date_format:'YYY-MM-DD HH:mm Z'
        },
    ],
    
}