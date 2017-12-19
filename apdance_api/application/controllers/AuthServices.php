<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 13/12/2017
 * Time: 17:37
 */

class AuthServices extends CI_Controller
{
    public function __construct($config = 'rest')
    {
        parent::__construct($config);
        $this->output->set_content_type('application/json');
        $this->output->set_header('Access-Control-Allow-Origin: *');
    }

    private $user;
    private $user_name;
    private $user_passwd;
    private $token_active;

    public function Auth(){
        $this->token_active = $this->input->header('token');

        /** TODO checar usuário para fazer login **/
    }

    public function checkSession(){
        //check session active$
        $valid = false;

        if($valid){
            $this->output->set_header('HTTP/1.0 200 OK');
        }else{
            $this->output->set_header('HTTP/1.0 403 Forbidden');
        }


        echo json_encode(array(
            'success'=>$valid,
            'metadata'=>array(
                'resource'=>'session'
            ),
            'data'=>array(),
            'mag'=>($valid) ? "Sessão ativa" : "Sessão inativa"
        ));
    }

    /**
     * Verifica se a sessão está ativa através do token de sessão
     * Se estiver retorna true, se não false.
     * http header => token
    */
    public function Login(){
        $this->output->set_content_type('application/json');

        $this->db->from("user_teste");
        $res = $this->db->get()->result_array();

        echo json_encode(array(
            'success'=>true,
            'metadata'=>array(
                'totalCount'=>count($res),
                'resource'=>'user_teste'
            ),
            'data'=>$res,
            'mag'=>'Success return'
        ));
    }
}