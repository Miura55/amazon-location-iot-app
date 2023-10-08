import json
import boto3

sns = boto3.client('sns')
iot = boto3.client('iot-data', region_name='ap-northeast-1')

def lambda_handler(event, context):
    print(event)
    
    # Push E-Mail
    params = {
        'TopicArn': 'arn:aws:sns:ap-northeast-1:1234567890:GeofenceEvent',
        'Subject': 'GPS Tracker Event',
        'Message': json.dumps(event, indent=2)
    }
    sns.publish(**params)
    
    # Publish IoT Core
    try:
        event_type = event['detail']['EventType']
        pub_msg =  {
            'event': event_type
        }
        iot.publish(
            topic = 'core2/gps/notify',
            qos = 0,
            payload = json.dumps(pub_msg)
        )
    except Exception as e:
        print(e)
        raise e

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
